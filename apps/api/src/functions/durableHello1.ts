import { app, InvocationContext } from '@azure/functions';
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
  },
});

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
