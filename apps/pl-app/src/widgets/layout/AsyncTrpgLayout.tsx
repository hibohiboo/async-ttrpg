import { Layout } from 'antd';
import { ReactNode } from 'react';

export function AsyncTrpgLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="h-12 flex items-center text-3xl pl-3">置卓</header>
      <Layout style={{ height: 'calc(100svh - 3rem)' }}>
        <Layout.Sider>menu</Layout.Sider>
        <Layout.Content className="w-full min-h-full overflow-y-auto p-6">
          {children}
        </Layout.Content>
      </Layout>
    </div>
  );
}
