import { app } from '@azure/functions';
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

app.http('durableHello1HttpStart', {
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
