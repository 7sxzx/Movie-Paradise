import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppLayout from './AppLayout'

const Movie = lazy(() => import('../pages/Movie'))
const User = lazy(() => import('../pages/User'))

const AppRouter: React.FC = () => {
  const RouteLoading: React.FC = () => (
    <>
      <span className="block w-48 h-8 my-4 loading" />
      <div className="w-full h-screen loading" />
    </>
  )

  return (
    <Router>
      <AppLayout>
        {/* maxDuration hard code to 150 */}
        <Suspense fallback={<RouteLoading />}>
          <Switch>
            <Route exact path="/" component={Movie} />
            <Route exact path="/movie" component={Movie} />
            <Route exact path="/user" component={User} />
          </Switch>
        </Suspense>
      </AppLayout>
    </Router>
  )
}

export default AppRouter
