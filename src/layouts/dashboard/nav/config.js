// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Хянах самбар',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Категори',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Аялал',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Блог',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Нэвтрэх',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Алдааны мессеж',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
