import * as React from 'react';
import { AllDone } from './AllDone';
import { CheckingTodayStatus } from './CheckingTodayStatus';
import { DisplayTodayStatus } from './DisplayTodayStatus';
import { LoginForm } from './LoginForm';
import { LoginInProgress } from './LoginInProgress';
import './Popup.scss';
import { ReportInProgress } from './ReportInProgress';

interface IProps {}

type TScreens =
  | 'login'
  | 'login_in_progress'
  | 'report_in_progress'
  | 'all_done'
  | 'checking_today_status'
  | 'display_today_status';
interface IState {
  screen: TScreens;
  loginErrorString: string;
  todayStatus: { date: string; reported: boolean };
}

export default class Popup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      screen: 'checking_today_status',
      loginErrorString: undefined,
      todayStatus: undefined
    };
  }

  private onMessageFromBackground(messageType: string, data: any) {
    console.log('onMessageFromBackground', messageType);
    switch (messageType) {
      case 'login_started':
        this.setState({ screen: 'login_in_progress' });
        break;

      case 'login_failed':
      case 'report_failed':
        this.setState({ screen: 'login', loginErrorString: data.todayStatus });
        break;

      case 'set_today_status':
        this.setState({
          screen: 'display_today_status',
          todayStatus: data.todayStatus
        });
        break;

      case 'login_success':
        this.setState({ screen: 'checking_today_status' });
        break;

      case 'report_started':
        this.setState({ screen: 'report_in_progress' });
        break;

      case 'report_success':
        this.setState({ screen: 'all_done' });
        break;
    }
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener((request, sender) => {
      if (!sender.tab) {
        this.onMessageFromBackground(request.messageType, request.data);
      }
    });
  }

  render() {
    let mainComponent;
    switch (this.state.screen) {
      case 'login':
        mainComponent = (
          <LoginForm errorMessage={this.state.loginErrorString} />
        );
        break;

      case 'login_in_progress':
        mainComponent = <LoginInProgress />;
        break;

      case 'report_in_progress':
        mainComponent = <ReportInProgress />;
        break;

      case 'all_done':
        mainComponent = <AllDone />;
        break;

      case 'checking_today_status':
        mainComponent = <CheckingTodayStatus />;
        break;

      case 'display_today_status':
        mainComponent = (
          <DisplayTodayStatus todayStatus={this.state.todayStatus} />
        );
        break;
    }

    return <div className='popupContainer'>{mainComponent}</div>;
  }
}
