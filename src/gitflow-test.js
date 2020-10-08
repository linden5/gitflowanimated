import React from "react";

import { ButtonIcon,Button } from "./global-styles";
import Gitflow, {BranchHeader, BranchName, BranchActions, GlobalActions} from './gitflow';

class GitflowTest extends Gitflow {

    renderMasterBranchHeader = (branch) => {
        return (
            <BranchHeader>
                <BranchName>{branch.name}</BranchName>
                <BranchActions count={2}>
                    <ButtonIcon onClick={() => this.props.onNewFeature(this.props.masterID)}>F</ButtonIcon>
                    <ButtonIcon
                        onClick={this.onNewHotFix}
                    >H</ButtonIcon>
                </BranchActions>
            </BranchHeader>
        )
    };

    renderDevelopBranchHeader = (branch) => {
        return (
            <BranchHeader>
                <BranchName>{branch.name}</BranchName>
                <BranchActions
                    count={3}
                >
                    <ButtonIcon onClick={this.props.onNewRelease}>R</ButtonIcon>
                    <ButtonIcon onClick={this.onNewFeature}>F</ButtonIcon>
                    <ButtonIcon
                        onClick={this.onBugFix}
                    >B</ButtonIcon>
                </BranchActions>
            </BranchHeader>
        )
    };

    renderGlobalActions = () => {
        return (
        <GlobalActions>
            <Button onClick={this.onNewHotFix}>New Hot Fix</Button>
            <Button onClick={this.props.onNewRelease}>New Release</Button>
            <Button onClick={this.onNewFeature}>New Feature</Button>
            <Button onClick={this.onBugFix}>New Test Bug Fix</Button>
        </GlobalActions>
        );
    };

    render () {
        this.onBugFix = this.props.onNewFeature.bind(this, this.props.developID, 'bug', 'yellow');
        return super.render()
    }
}

export default GitflowTest