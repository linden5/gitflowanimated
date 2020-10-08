import React from "react";

import { ButtonIcon,Button } from "./global-styles";
import Gitflow, {BranchHeader, BranchName, BranchActions, GlobalActions, renderReleaseActions} from './gitflow';

class AliFlow extends Gitflow {
    renderDevelopBranchHeader = () => {}

    renderMasterBranchHeader = (branch) => {
        return (
            <BranchHeader>
                <BranchName>{branch.name}</BranchName>
                <BranchActions count={3}>
                    <ButtonIcon onClick={() => this.props.onNewFeature(this.props.masterID)}>F</ButtonIcon>
                    <ButtonIcon
                        onClick={this.onNewHotFix}
                    >H</ButtonIcon>
                    <ButtonIcon onClick={() => this.props.onNewRelease(this.props.masterID)}>R</ButtonIcon>
                </BranchActions>
            </BranchHeader>
        )
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
                    onClick={this.props.onRelease.bind(this, branch.id, undefined)}
                >A</ButtonIcon>
            </BranchActions>
        )
    };
}

export default AliFlow