import { format } from 'date-fns';
import { Context } from 'hono';

export async function httpTrigger1(c: Context) {
  const name = c.req.query('name') || (await c.req.text()) || 'world';
  console.log(name);
  const time = format(new Date(), 'yyyy-MM-dd: HH:mm:ss');
  return c.json({ msg: `Hello, ${name}!`, time });
}
