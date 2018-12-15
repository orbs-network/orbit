import * as React from 'react';
import './Popup.scss';
import { LoginForm } from "./LoginForm"
import { LoginInProgress } from "./LoginInProgress"
import { ReportInProgress } from "./ReportInProgress"
import { MainScreen } from "./MainScreen"
import { AllDone } from "./AllDone"
import { markSuccessfullLogin, hadSuccessfullLoginEver } from "./loginHistory";
import { markSuccessfullReport, hadSuccessFullReportToday } from "./reportHistory";

interface IProps { }

type TScreens = 'login' | 'login_in_progress' | 'main_screen' | 'report_in_progress' | 'all_done';
interface IState {
    screen: TScreens;
    loginErrorString: string;
}

export default class Popup extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        let screen: TScreens;
        if (hadSuccessfullLoginEver()) {
            if (hadSuccessFullReportToday()) {
                console.log('We had a successfull report today, going to "all_done".');
                screen = 'all_done'
            } else {
                console.log('We did not had a successfull report today, going to "main_screen"');
                screen = 'main_screen';
            }
        } else {
            console.log('this is the first time we open the extension, going to login');
            screen = 'login';
        }
        this.state = { screen, loginErrorString: undefined }
    }

    componentWillMount() {
        if (this.state.screen === 'main_screen' || this.state.screen === 'all_done') {
            chrome.runtime.sendMessage({ messageType: 'checkLoginStatus' });
        }
    }

    private onMessageFromBackground(messageType: string, data: any) {
        console.log('onMessageFromBackground', messageType);
        switch (messageType) {
            case "login_started":
                this.setState({ screen: 'login_in_progress' })
                break;

            case "login_failed":
            case "report_failed":
                this.setState({ screen: 'login', loginErrorString: data.errorString })
                break;

            case "login_success":
                markSuccessfullLogin();
                this.setState({ screen: 'main_screen' })
                break;

            case "report_started":
                this.setState({ screen: 'report_in_progress' })
                break;

            case "report_success":
                markSuccessfullReport();
                this.setState({ screen: 'all_done' })
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
                mainComponent = <LoginForm errorMessage={this.state.loginErrorString} />;
                break;

            case 'login_in_progress':
                mainComponent = <LoginInProgress />;
                break;

            case 'main_screen':
                mainComponent = <MainScreen />;
                break;

            case 'report_in_progress':
                mainComponent = <ReportInProgress />;
                break;

            case 'all_done':
                mainComponent = <AllDone />;
                break;
        }

        return <div className="popupContainer">{mainComponent}</div>;
    }
}
