// src/app/[lng]/layout.tsx
// import '../../globals.css';
import { ReactNode } from 'react';
import ClientHeader from '../../components/Header';

export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}) {
  return {
    title: 'GitHub Repo Search',
    // HTML lang 속성은 이 함수로 설정
    // 이는 실제 html 태그에 직접 적용되지는 않지만 SEO 등에 도움
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lng: string };
}) {
  // 이제 여기선 직접 lang 설정 안 해도 됨
  return (
    <html>
      <body>
        <ClientHeader />
        {children}
      </body>
    </html>
  );
}
