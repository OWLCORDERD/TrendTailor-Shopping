import Link from 'next/link'
import { MdSpaceDashboard } from "react-icons/md";

export default function NotFound() {
  return (
    <div className='not-found-container'>
        <h1 className='not-found-code'>404</h1>
        <h2 className='not-found-title'>Page Not Found :)</h2>
        <p className='not-found-description'>요청하신 페이지를 찾지 못하였습니다.</p>
        <Link href="/" className='dashboard-link'>
            <MdSpaceDashboard className='dashboard-link-icon' />
            대시보드 이동
        </Link>
    </div>
  )
}