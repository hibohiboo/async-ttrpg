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
df.app.orchestration(
  'durableOrchestratorActivityErrorHandling',
  function* durableOrchestratorOrchestratorFunctionCodeConstraints(context) {
    const firstRetryIntervalInMilliseconds = 2000;
    const maxNumberOfAttempts = 3;

    // 関数呼び出しを最大3回再試行する。次の再試行までに2秒間待機する。
    const retryOptions = new df.RetryOptions(
      firstRetryIntervalInMilliseconds, // 次の再試行までの待機時間
      maxNumberOfAttempts, // 最大試行回数. 1を指定すると再試行なし。
    );
    // 1を超えた値を指定すると、次の再試行までの待機時間が指数関数的に増加する。
    retryOptions.backoffCoefficient = 2; // 指数バックオフの係数.デフォルトは1.0.
    retryOptions.retryTimeoutInMilliseconds = 30 * 1000; // 再試行のタイムアウト時間
    const flaky = yield context.df.callActivityWithRetry(
      'flakyFunction',
      retryOptions,
    );

    const timeoutTask = context.df.createTimer(
      addSeconds(context.df.currentUtcDateTime, 30),
    );
    context.log('handling test start');

    yield context.df.Task.any([timeoutTask, flaky]);
    context.log('handling test end');
  },
);
df.app.activity('flakyFunction', {
  handler: async (_, context: InvocationContext) => {
    context.log('flakyFunction start', context);
    throw new Error(`error test`);
  },
});
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
