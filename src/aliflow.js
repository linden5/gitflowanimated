import React from "react";

import { ButtonIcon,Button } from "./global-styles";
import Gitflow, {BranchHeader, BranchName, BranchActions, GlobalActions, renderReleaseActions} from './gitflow';

class AliFlow extends Gitflow {
    state = {
        activeReleaseBranchID: null
    };

    onNewRelease = () => this.props.onNewRelease(this.props.masterID);
    onMasterFeature = () => this.props.onNewFeature(this.props.masterID);

    renderDevelopBranchHeader = () => {}

    renderMasterBranchHeader = (branch) => {
        return (
            <BranchHeader>
                <BranchName>{branch.name}</BranchName>
                <BranchActions count={3}>
                    <ButtonIcon onClick={this.onMasterFeature}>F</ButtonIcon>
                    <ButtonIcon
                        onClick={this.onNewHotFix}
                    >H</ButtonIcon>
                    <ButtonIcon onClick={this.onNewRelease}>R</ButtonIcon>
                </BranchActions>
            </BranchHeader>
        )
    };

    renderHotFixBranchHeader = (branch) => {
        return this.renderReleaseBranchHeader(branch, () => this.renderHotfixActions(branch, 'T'));
    };

    renderReleaseActions = (branch) => {
        return (
            <BranchActions
                count={3}
            >
                <ButtonIcon
                    onClick={this.props.onNewFeature.bind(this, branch.id, 'bug', 'yellow')}
                >B</ButtonIcon>
                <ButtonIcon
                    onClick={this.props.onRelease.bind(this, branch.id, undefined)}
                >T</ButtonIcon>
                <ButtonIcon
                    onClick={() => {this.setState({...this.state, activeReleaseBranchID: branch.id})}}
                    active={this.state.activeReleaseBranchID === branch.id}
                    title="激活当前发布分支"
                >A</ButtonIcon>
            </BranchActions>
        )
    };

    renderFeatureBranchMergeButton = (branch) => {
        return this.state.activeReleaseBranchID ? (
            <ButtonIcon
                onClick={this.props.onMerge.bind(this, branch.id, this.state.activeReleaseBranchID)}
            >M</ButtonIcon>
        ) : undefined;
    };

    renderGlobalActions = () => {
        return (
        <GlobalActions>
            <Button onClick={this.onNewHotFix}>New Hot Fix</Button>
            <Button onClick={this.onNewRelease}>New Release</Button>
            <Button onClick={this.onMasterFeature}>New Feature</Button>
        </GlobalActions>
        );
    };
}

export default AliFlow