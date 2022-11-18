import dynamic from 'next/dynamic';

const DynamicUserList = dynamic(() => import('./components/UserList'), {
  ssr: false,
});

export default function Home() {
  return <DynamicUserList />;
}
