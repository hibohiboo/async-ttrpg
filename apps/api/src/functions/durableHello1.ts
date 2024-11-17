import { app, InvocationContext } from '@azure/functions';
import { addSeconds } from 'date-fns';
import * as df from 'durable-functions';

const activityName = 'durableHello1';

df.app.orchestration(
  'durableHello1Orchestrator',
  function* durableHello1Orchestrator(context) {
    const outputs = [];
    outputs.push(yield context.df.callActivity(activityName, 'Tokyo'));
    outputs.push(yield context.df.callActivity(activityName, 'Seattle'));
    outputs.push(yield context.df.callActivity(activityName, 'Cairo'));

    return outputs;
  },
);
df.app.activity(activityName, {
  handler: (input) => `Hello, ${input}`,
});

// --------------------------------

df.app.orchestration(
  'durableOrchestrator',
  function* orchestrator(context: df.OrchestrationContext) {
    const outputs = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 5; i++) {
      try {
        const result = yield context.df.callActivity('WaitTest', i);
        outputs.push(result);
        // eslint-disable-next-line sonarjs/no-ignored-exceptions
      } catch (e) {
        // context.error(`Error in orchestration: ${i}`, e);
        context.error(`Error in orchestration: ${i}`);
      }
    }
    context.log('Orchestration end.', outputs);
    return outputs;
  },
);

df.app.activity('WaitTest', {
  handler: async (num: number, context: InvocationContext) => {
    context.log(`Wait start ${num}.`);
    if (num === 3) throw new Error(`wait test ${num}`);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    context.log(`Wait end ${num}.`);
    return `Wait ${num}`;
  },
});

// --------------------------------
df.app.orchestration(
  'durableOrchestratorOrchestratorFunctionCodeConstraints',
  function* durableOrchestratorOrchestratorFunctionCodeConstraints(context) {
    const outputs: string[] = [];

    // GUID
    outputs.push(context.df.newGuid('v5なので与えられた文字列に対して一定'));
    context.log('uuid v5.', outputs);

    // 日付と時刻
    const expiration = addSeconds(context.df.currentUtcDateTime, 30);
    const timeoutTask = context.df.createTimer(expiration);
    const approved = context.df.waitForExternalEvent('Approval');
    context.log('wait approve start');
    // どちらかが終わるまで待つ = タイムアウトの動きとなる
    const winner = yield context.df.Task.any([timeoutTask, approved]);
    if (winner === timeoutTask) {
      outputs.push('timeout');
    } else {
      outputs.push('not timeout');
    }
    context.log('Orchestrator end.', outputs);
    return outputs;
  },
);
// --------------------------------
app.http('durableHttpStart', {
  route: 'orchestrators/{orchestratorName}',
  extraInputs: [df.input.durableClient()],
  handler: async (request, context) => {
    const client = df.getClient(context);
    const body = await request.text();
    const instanceId = await client.startNew(request.params.orchestratorName, {
      input: body,
    });

    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(request, instanceId);
  },
});
