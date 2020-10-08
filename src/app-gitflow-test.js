import shortid from "shortid";
import App from './app';
import GitFlowTest from './gitflow-test'

const DEVELOP = 'test';
const MASTER = 'master';

const masterID = shortid.generate();
const developID = shortid.generate();

const seedData = () => {

    const commits = [
        {
            id: shortid.generate(),
            branch: masterID,
            gridIndex: 1,
            parents: null,
        },
        {
            id: shortid.generate(),
            branch: developID,
            gridIndex: 1,
            parents: null
        }
    ];
    return {
        branches: [
            {
                name: MASTER,
                id: masterID,
                canCommit: false,
                color: '#E040FB',
            },
            {
                name: DEVELOP,
                id: developID,
                canCommit: true,
                color: '#FF8A65',
            }
        ],
        commits
    }
};

class AppGitflowTest extends App {
    Flow = GitFlowTest;
    developBranchName = DEVELOP;
    developID = developID;
    masterID = masterID;
    state = {
        project: seedData()
    };
}

export default AppGitflowTest