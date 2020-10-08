import React, {Component} from 'react';
import styled from "styled-components";
import GitFlow from "./gitflow";
import shortid from "shortid";

const DEVELOP = 'develop';
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

const AppElm = styled.main`
  text-align: center;
  padding: 10px;
`;

class App extends Component {
    Flow = GitFlow;
    developBranchName = DEVELOP;
    developID = developID;
    masterID = masterID;
    state = {
        project: seedData()
    };

    handleCommit = (branchID, mergeGridIndex = 0) => {
        let {commits} = this.state.project;
        const branchCommits = commits.filter(c => c.branch === branchID);
        const lastCommit = branchCommits[branchCommits.length - 1];
        commits.push({
            id: shortid.generate(),
            branch: branchID,
            gridIndex: lastCommit.gridIndex + mergeGridIndex + 1,
            parents: [lastCommit.id]
        });
        this.setState({
            commits
        });
    };

    handleNewFeature = (branchID = this.developID, branchName = 'feature', branchColor = '#64B5F6') => {
        let {branches, commits} = this.state.project;
        let featureBranches = branches.filter(b => b.featureBranch);
        let featureBranchName = branchName + ' ' + ((featureBranches || []).length + 1);
        let developCommits = commits.filter(c => c.branch === branchID);
        const lastDevelopCommit = developCommits[developCommits.length - 1];
        let featureOffset = lastDevelopCommit.gridIndex + 1;
        let newBranch = {
            id: shortid.generate(),
            name: featureBranchName,
            featureBranch: true,
            canCommit: true,
            color: branchColor
        };
        let newCommit = {
            id: shortid.generate(),
            branch: newBranch.id,
            gridIndex: featureOffset,
            parents: [lastDevelopCommit.id]
        };
        commits.push(newCommit);
        branches.push(newBranch);
        this.setState({
            project: {
                branches,
                commits
            }
        });
    };

    handleNewHotFix = (branchID = this.masterID, hostFixName = 'hot', hotFixColor = '#ff1744' ) => {
        let {branches, commits} = this.state.project;
        let hotFixBranches = branches.filter(b => b.hotFixBranch);
        let hotFixBranchName = hostFixName + ' ' + ((hotFixBranches || []).length + 1);
        let masterCommits = commits.filter(c => c.branch === branchID);
        const lastMasterCommit = masterCommits[masterCommits.length - 1];
        let hotFixOffset = lastMasterCommit.gridIndex + 1;

        let newBranch = {
            id: shortid.generate(),
            name: hotFixBranchName,
            hotFixBranch: true,
            canCommit: true,
            color: hotFixColor
        };
        let newCommit = {
            id: shortid.generate(),
            branch: newBranch.id,
            gridIndex: hotFixOffset,
            parents: [lastMasterCommit.id]
        };
        commits.push(newCommit);
        branches.push(newBranch);
        this.setState({
            project: {
                branches,
                commits
            }
        });
    };

    handleNewRelease = (branchID = this.developID) => {
        let {branches, commits} = this.state.project;
        let releaseBranches = branches.filter(b => b.releaseBranch);
        let releaseBranchName = 'release ' + ((releaseBranches || []).length + 1);
        let developCommits = commits.filter(c => c.branch === branchID);
        const lastDevelopCommit = developCommits[developCommits.length - 1];
        let releaseOffset = lastDevelopCommit.gridIndex + 1;
        let newBranch = {
            id: shortid.generate(),
            name: releaseBranchName,
            releaseBranch: true,
            canCommit: true,
            color: '#B2FF59'
        };
        let newCommit = {
            id: shortid.generate(),
            branch: newBranch.id,
            gridIndex: releaseOffset,
            parents: [lastDevelopCommit.id]
        };
        commits.push(newCommit);
        branches.push(newBranch);
        this.setState({
            project: {
                branches,
                commits
            }
        });
    };

    getMergeCommit = (lastSourceCommit, targetBranchID) => {
        const lastTargetBranchCommit = this.getLastCommit(targetBranchID)
        return {
            id: shortid.generate(),
            branch: targetBranchID,
            gridIndex: Math.max(lastSourceCommit.gridIndex, lastTargetBranchCommit.gridIndex) + 1,
            parents: [lastTargetBranchCommit.id, lastSourceCommit.id]
        };
    };

    getLastCommit = (branchID) => {
        let {commits} = this.state.project;
        const sourceCommits = commits.filter(c => c.branch === branchID);
        return sourceCommits[sourceCommits.length - 1];
    }

    handleRelease = (sourceBranchID) => {
        this.handleMerge(sourceBranchID, this.masterID)
        this.handleMerge(sourceBranchID, this.developID)
    };

    handleMerge = (sourceBranchID, targetBranchID = this.developID) => {
        let {branches, commits} = this.state.project;

        const sourceBranch = branches.find(b => b.id === sourceBranchID);
        const lastSourceCommit = this.getLastCommit(sourceBranchID)

        commits.push(this.getMergeCommit(lastSourceCommit, targetBranchID));

        sourceBranch.merged = true;

        this.setState({
            project: {
                branches,
                commits
            }
        });
    };

    handleDeleteBranch = (branchID) => {
        let {branches, commits} = this.state.project;

        let commitsToDelete = commits.filter(c => c.branch === branchID);
        let lastCommit = commitsToDelete[commitsToDelete.length - 1];
        commits = commits.map(commit => {
            if (commit.parents) {
                commit.parents = commit.parents.filter(pID => pID !== lastCommit.id);
            }
            return commit;

        });
        branches = branches.filter(b => b.id !== branchID);
        commits = commits.filter(c => c.branch !== branchID);
        this.setState({
            project: {
                branches,
                commits
            }
        });
    };

    render() {
        return (
            <AppElm>
                <this.Flow
                    masterID={this.masterID}
                    developID={this.developID}
                    developBranchName={this.developBranchName}
                    masterBranchName="master"
                    project={this.state.project}
                    onMerge={this.handleMerge}
                    onRelease={this.handleRelease}
                    onCommit={this.handleCommit}
                    onNewFeature={this.handleNewFeature}
                    onNewRelease={this.handleNewRelease}
                    onDeleteBranch={this.handleDeleteBranch}
                    onNewHotFix={this.handleNewHotFix}
                />
            </AppElm>
        );
    }
}

export default App;
