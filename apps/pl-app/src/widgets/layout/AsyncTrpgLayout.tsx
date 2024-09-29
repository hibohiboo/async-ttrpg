import { Layout as AntdLayout } from 'antd';
import { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="h-12 flex items-center text-3xl pl-3">置卓</header>
      <AntdLayout style={{ height: 'calc(100svh - 3rem)' }}>
        <AntdLayout.Sider>menu</AntdLayout.Sider>
        <AntdLayout.Content className="w-full min-h-full overflow-y-auto p-6">
          {children}
        </AntdLayout.Content>
      </AntdLayout>
    </div>
  );
}
