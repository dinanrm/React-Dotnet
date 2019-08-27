import React, {useState} from 'react'
// import NewProject from '../NewProject'
import Dashboard from '../Dashboard'
import ChangeRequest from '../ChangeRequest'
import ExistingProject from '../ExistingProject'
import LessonLearned from '../LessonLearned'
import LessonLearnedDetail from '../LessonLearnedDetail'
import { Route, Switch, Redirect } from 'react-router-dom'
import NavMenu from '../NavMenu'
import NoMatch from '../NoMatch'
import { Link } from 'react-router-dom'
import {  MenuLayout, BodyLayout, Sidebar, Content, Button, Label  } from './style' 
import CreateProject from '../CreateProject';
import PlanningForm from '../PlanningForm';
import ViewProject from '../ViewProject';
import ExecutingProject from '../ExecutingProject';
import ClosingProject from '../ClosingProject';
import ManagementUpload from '../ManagementUpload'
// import Archive from '../Archive'
import PlanningProject from '../PlanningProject'
import LogHistory from '../LogHistoryProject'
import { IoIosSpeedometer, IoIosPaper, IoIosPerson, IoIosLock } from 'react-icons/io' 
import { Consumer } from '../../utils/context'
import UserPage from '../UserPage';

const Home = (props) => {
    const [isLogout,setIsLogout] = useState(false);
    const signout = (e,logout) => {
      e.preventDefault();
      logout();
      setIsLogout(true)
    }
    if (isLogout === true) {
      return (
          <Redirect to="/signin"/>
        )
    };

    return (
      <Consumer>
      {({state,logout}) =>
      <MenuLayout className="d-flex flex-column h-auto">
        <NavMenu path={props}/>
        <BodyLayout className="d-flex flex-row">
          <Sidebar className="d-flex col-2 flex-column align-items-center pt-3">
            <Link to="/" className="pl-1 py-4 w-100">
              <Button className="btn btn-block btn-lg text-white text-left" active={props.location.pathname === "/"}>
                <Label><IoIosSpeedometer className="mr-3 mb-1"/>DASHBOARD</Label>
              </Button>
            </Link>
            <Link to="/project" className="pl-1 py-4 w-100">
              <Button className="btn btn-block btn-lg text-white text-left" active={props.location.pathname  === "/project"}>
                <Label><IoIosPaper className="mr-3 mb-1"/>PROJECT</Label>
              </Button>
            </Link>
            {/* <Link to="/archieve" className="pl-1 py-4 w-100">
              <Button className="btn btn-block btn-lg text-white text-left" active={props.location.pathname  === "/archieve"}>
                <Label><IoIosFolderOpen className="mr-3 mb-1"/>ARCHIVE</Label>
              </Button>
            </Link> */}
            <Link to="/users" className="pl-1 py-4 w-100">
              <Button className="btn btn-block btn-lg text-white text-left" active={props.location.pathname  === "/users"}>
                <Label><IoIosPerson className="mr-3 mb-1"/>USER</Label>
              </Button>
            </Link>
            <div className="pl-1 py-4 w-100">
              <Button className="btn btn-block btn-lg text-white text-left" onClick={(e) => signout(e,logout)}>
                <Label><IoIosLock className="mr-3 mb-1"/>SIGN OUT</Label>
              </Button>
            </div>
          </Sidebar>
          <Content className="col-10 px-0 bg-white">
            <Switch>
              {/* <Route exact path="/" component={Menu}></Route> */}
              <Route exact path="/" component={Dashboard}></Route>
              <Route path="/create-project" component={CreateProject}></Route>
              <Route path="/change-request" component={ChangeRequest}></Route>
              <Route path="/project/:id/lesson-learned/:idLL" component={LessonLearnedDetail}></Route>
              <Route path="/project/:id/lesson-learned" component={LessonLearned}></Route>
              <Route path="/project/:id/planning" render={(props) => <PlanningProject {...props} user={state} />}></Route>
              <Route path="/project/:id/closing" render={(props) => <ClosingProject {...props} user={state} />}></Route>
              <Route path="/project/:id/executing" render={(props) => <ExecutingProject {...props} user={state} />}></Route>
              <Route path="/project/:id" render={(props) => <ViewProject {...props} user={state} />}></Route>
              <Route path="/project" render={(props) => <ExistingProject {...props} user={state} />}></Route>
              <Route path="/users" render={(props) => <UserPage {...props} user={state} />}></Route>
              <Route path="/history/:id" render={(props) => <LogHistory {...props} user={state} />}></Route>
              <Route path="/managementPlanning/:id" render={(props) => <PlanningForm {...props} user={state}/>}></Route>
              <Route path="/managementExecuting/:id" render={(props) => <ManagementUpload {...props} user={state}/>}></Route>
              {/* <Route path="/archieve" render={(props) => <Archive {...props} user={state}/>}></Route> */}
              {/* <Route path="/lesson-learned/:id" component={LessonLearned}></Route> */}
              <Route path="/:sd" component={NoMatch}></Route>
            </Switch>
          </Content>
        </BodyLayout>
      </MenuLayout>
      }
      </Consumer>
    )
}

export default Home;


