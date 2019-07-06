import React, { ChangeEvent, Component, FormEvent } from 'react';
import { History } from './History';
import Input from './Input';
import commands from '../commands';
import './Terminal.scss';

export class Terminal extends Component<TerminalProps, TerminalState> {
  public readonly state: TerminalState = {
    currentCommandId: 0,
    currentPath: '/',
    history: [],
    inputValue: '',
    promptChar: '$>',
    fileSystem: this.props.fileSystem,
  };

  private handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  private handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const {
      history,
      inputValue,
      currentPath,
      promptChar,
      fileSystem,
    } = this.state;
    const [commandName, commandArg] = inputValue.split(' ');

    let commandResult: CommandResponse['commandResult'];
    let updatedState: CommandResponse['updatedState'] = {};
    if (commandName in commands) {
      try {
        ({ commandResult, updatedState = {} } = await commands[
          commandName as keyof typeof commands
        ](fileSystem, currentPath, commandArg));
      } catch (e) {
        commandResult = `Error: ${e}`;
      }
    } else {
      commandResult = `command not found: ${commandName}`;
    }

    const updatedHistory = history.concat({
      input: (
        <Input
          currentPath={currentPath}
          inputValue={inputValue}
          promptChar={promptChar}
          readOnly={true}
        />
      ),
      id: this.state.currentCommandId,
      result: commandResult,
      value: inputValue,
    });

    this.setState(Object.assign(
      {
        currentCommandId: this.state.currentCommandId + 1,
        history: updatedHistory,
        inputValue: '',
      },
      updatedState,
    ) as TerminalState);
  };

  public render(): JSX.Element {
    const { currentPath, history, inputValue, promptChar } = this.state;
    return (
      <div id="terminal-wrapper">
        <History history={history} />
        <Input
          currentPath={currentPath}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          inputValue={inputValue}
          promptChar={promptChar}
          readOnly={false}
        />
      </div>
    );
  }
}
