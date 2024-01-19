import { lazy } from 'react';

const Chart = lazy(() => import('../pages/Chart'));
const Rules = lazy(() => import('../pages/Rules'));
const RuleTestList = lazy(() => import('../pages/RuleDetails/TestRulesList'));
const TestRule = lazy(() => import('../pages/RuleDetails/TestRule'));
const Delete = lazy(() => import('../pages/Delete'));
const RuleCreatePage = lazy(
  () => import('../pages/RuleDetails/RuleCreatePage'),
);

const coreRoutes = [
  {
    path: '/rules',
    title: 'Rules',
    component: Rules,
  },

  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
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
  {
    path: '/delete',
    title: 'Delete Route',
    component: Delete,
  },
];

const routes = [...coreRoutes];
export default routes;
