import shortid from "shortid";
import App from './app';
import AliFlow from './aliflow'

const MASTER = 'master';

const masterID = shortid.generate();

const seedData = () => {

    const commits = [
        {
            id: shortid.generate(),
            branch: masterID,
            gridIndex: 1,
            parents: null,
        }
    ];
    return {
        branches: [
            {
                name: MASTER,
                id: masterID,
                canCommit: false,
                color: '#E040FB',
            }
        ],
        commits
    }
};

class AppAliFlow extends App {
    Flow = AliFlow;
    masterID = masterID;
    state = {
        project: seedData()
    };

    handleRelease = (sourceBranchID) => {
        const targetBranches = [this.masterID]
        let {branches} = this.state.project;
        branches.forEach(branch => {
            if (branch.releaseBranch && branch.id !== sourceBranchID && !branch.merged) {
                targetBranches.push(branch.id)
            }
        })

        this.setState(this.getMergedState(sourceBranchID, targetBranches));
    };

}

export default AppAliFlow