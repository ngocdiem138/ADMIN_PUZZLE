import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));
const UserTable = lazy(() => import('./tables/UserTable'));
const JobTable = lazy(() => import('./tables/JobTable'));
const CompanyTable = lazy(() => import('./tables/CompanyTable'));
const PositionTable = lazy(() => import('./tables/PositionTable'));
const SkillTable = lazy(() => import('./tables/SkillTable'));
const ServiceTable = lazy(() => import('./tables/ServiceTable'));
const CategoryTable = lazy(() => import('./tables/CategoryTable'));

const Mdi = lazy(() => import('./icons/Mdi'));

const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Profile = lazy(() => import('./user-pages/Profile'));
const ResetPassword = lazy(() => import('./user-pages/ResetPassword'));
const ForgotPassword = lazy(() => import('./user-pages/ForgotPassword'));
const Register1 = lazy(() => import('./user-pages/Register'));
const UserProfile = lazy(() => import('./user-pages/UserProfile'));
const NewUserProfile = lazy(() => import('./user-pages/NewUserProfile'));
const CompanyProfile = lazy(() => import('./company-pages/CompanyProfile'));
const NewCompanyProfile = lazy(() => import('./company-pages/NewCompanyProfile'));
const ExtraInfoProfile = lazy(() => import('./extrainfo-pages/ExtraInfoProfile'));
const NewExtraInfoProfile = lazy(() => import('./extrainfo-pages/NewExtraInfoProfile'));
const NewBlogProfile= lazy(() => import('./blog-pages/NewBlogProfile'));
const BlogDashboard = lazy(() => import('./blog-pages/BlogDashboard'));
class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/dashboard" component={ Dashboard } />

          <Route path="/basic-ui/buttons" component={ Buttons } />
          <Route path="/basic-ui/dropdowns" component={ Dropdowns } />
          <Route path="/basic-ui/typography" component={ Typography } />

          <Route path="/form-Elements/basic-elements" component={ BasicElements } />

          <Route path="/tables/basic-table" component={ BasicTable } />
          <Route path="/users/user-table" component={ UserTable } />
          <Route path="/jobs/job-table" component={ JobTable } />
          <Route path="/companys/company-table" component={ CompanyTable } />
          <Route path="/icons/mdi" component={ Mdi } />
          <Route path="/extraInfos/position-table" component={ PositionTable } />
          <Route path="/extraInfos/skill-table" component={ SkillTable } />
          <Route path="/extraInfos/service-table" component={ ServiceTable } />
          <Route path="/blogs/categories" component={ CategoryTable } />
          <Route path="/charts/chart-js" component={ ChartJs } />


          <Route path="/login" component={ Login } />
          <Route path="/profile" component={ Profile } />
          <Route path="/blogs/new" component={ NewBlogProfile } />
          <Route path="/blogs/dashboard" component={ BlogDashboard } />
          <Route path="/users/new" component={ NewUserProfile } />
          <Route path="/users/:id" component={ UserProfile } />
          <Route path="/companys/new" component={ NewCompanyProfile } />
          <Route path="/companys/:id" component={ CompanyProfile } />
          <Route path="/extraInfos/new" component={ NewExtraInfoProfile } />
          <Route path="/extraInfos/:id" component={ ExtraInfoProfile } />
          <Route path="/user-pages/reset-password" component={ ResetPassword } />
          <Route path="/user-pages/forgot-password" component={ ForgotPassword } />
          <Route path="/user-pages/register-1" component={ Register1 } />

          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />


          <Redirect to="/dashboard" component={ Dashboard } />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;