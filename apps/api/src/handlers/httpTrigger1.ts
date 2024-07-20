import { format } from 'date-fns';
import { Context } from 'hono';
import { BlankEnv, BlankInput } from 'hono/types';

export async function httpTrigger1(
  c: Context<BlankEnv, '/api/httpTrigger1', BlankInput>, //  Context<HttpRequest, '/api/httpTrigger1', InvocationContext>,
  // request: HttpRequest,
  // context: InvocationContext,
) {
  //: Promise<HttpResponseInit>
  // c.context.log(`Http function processed request for url "${request.url}"`);
  // リクエストパラメータ name から名前を取得
  

  const name = c.req.query('name') || (await c.req.text()) || 'world';
  const time = format(new Date(), 'yyyy-MM-dd: HH:mm:ss');
  return c.json({ msg: `Hello, ${name}!`, time });
  // return {
  //   body: JSON.stringify({
  //     msg: `Hello, ${name}!`,
  //     time,
  //   }),
  // };
}
