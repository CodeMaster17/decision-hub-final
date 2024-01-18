import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Rules = lazy(() => import('../pages/Rules'));
const RuleTestList = lazy(() => import('../pages/RuleDetails/TestRulesList'));
const TestRule = lazy(() => import('../pages/RuleDetails/TestRule'));
const RuleCreatePage = lazy(
  () => import('../pages/RuleDetails/RuleCreatePage'),
);
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/rules',
    title: 'Rules',
    component: Rules,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/rule/create',
    title: 'Rule Detials',
    component: RuleCreatePage,
  },
  {
    path: '/rule/test',
    title: 'Test your Rules',
    component: RuleTestList,
  },
  {
    path: '/rule/:id',
    title: 'Rule Test',
    component: TestRule,
  },
];

const routes = [...coreRoutes];
export default routes;
