import Search from '@/pages/Search/Search'
import MSite from '@/pages/MSite/MSite'
import Order from '@/pages/Order/Order'
import Profile from '@/pages/Profile/Profile'
import Login from '@/pages/Login/Login'
export default [{
    path: '/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/msite',
    component: MSite,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/msite'
  }
]