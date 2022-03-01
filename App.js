import React from 'react';
import styled from 'styled-components/native';

import {Header} from './src/pages/parts/Header/Header';
import {Board} from './src/pages/parts/Board/Board';
import {Card} from './src/pages/parts/Card/Card';
import {CardContainer} from './src/pages/CardContainer/CardContainer';
import {CardText} from './src/pages/parts/CardText/CardText';

import {useColorScheme, StatusBar, Alert, Text} from 'react-native';

const AppContainer = styled.View`
  flex: 1;
  align-items: center;

  background-color: ${({colorScheme}) =>
    colorScheme === 'light' ? '#f2f2f2' : '#222222'};
`;

const MainText = styled.Text`
  font-size: 42px;
  font-weight: bold;
  letter-spacing: 3px;
  color: ${({colorScheme}) =>
    colorScheme === 'light' ? '#222222' : '#ffffff'};
`;

const ResetGameButton = styled.TouchableOpacity`
  background-color: purple;
  padding: 20px 60px;
  margin-top: 20px;
  border-radius: 3px;
`;

const ResetGameText = styled.Text`
  color: #fff;
  font-size: 32px;
  text-transform: uppercase;
  font-weight: bold;
`;

const PlayerInfoText = styled.Text`
  font-size: 28px;
  color: ${({colorScheme}) =>
    colorScheme === 'light' ? '#333333' : '#bbbbbb'};
  margin-top: 20px;
`;

const App = () => {
  const [winner, setWinner] = React.useState('X');
  const [board, setBoard] = React.useState(
    new Array(3).fill('').map(() => new Array(3).fill('')),
  );
  const [isFirstPlayer, setIsFirstPlayer] = React.useState(
    Math.random() > 0.5 ? true : false,
  );
  const colorScheme = useColorScheme();

  const resetGame = () => {
    setWinner('');
    const newBoard = new Array(3).fill('').map(() => new Array(3).fill(''));
    setBoard(newBoard);
  };

  const pressButton = (row, col) => {
    if (winner.length > 0) {
      Alert.alert('Game Over!');
      return false;
    }
    if (board[row][col].length) {
      Alert.alert('Already choosed!');
      return;
    }
    const oldBoard = [...board];
    oldBoard[row][col] = isFirstPlayer ? 'X' : 'O';
    setBoard(oldBoard);
    setIsFirstPlayer(!isFirstPlayer);
    checkWinner();
  };

  const checkWinner = () => {
    const checkDraw = ()=> {
      const isDraw = board.every(row => row.every(col => col.length > 0))
      console.log(isDraw);
      if (isDraw) {
        Alert.alert('Draw!');
        setWinner('Draw');
      }
    };

    const checkHorizontals = () => {
      const rows = [];
      for (let row = 0; row < 3; row++) {
        let winnerRow = false;
        let isEqual = board[row].every(boardCol => board[row][0] === boardCol);
        if (isEqual && board[row][0] !== '') {
          winnerRow = true;
        }
        rows.push({
          boardRow: board[row],
          boardCol: 0,
          rowSymbol: board[row][0],
          winner: winnerRow,
          direction: 'horizontal',
          col: 0,
          row,
        });
      }
      return rows;
    };

    const checkVerticals = () => {
      const rows = [];

      for (let col = 0; col < 3; col++) {
        const symbols = [];
        for (let row = 0; row < 3; row++) {
          symbols.push(board[row][col]);
        }
        let winnerRow = false;

        let isEqual = symbols.every(cellSymbol => cellSymbol.length > 0);

        if (isEqual && board[0][col] !== '') {
          winnerRow = true;
        }

        rows.push({
          boardRow: 0,
          boardCol: col,
          rowSymbol: board[0][col],
          winner: winnerRow,
          direction: 'Vertial',
          col: col,
          row: 0,
        });
      }

      return rows;

    };

    const checkDiagonals = () => {

      
    };

    const gameLoop = () => {
      const horizontalWinner = hasWinner(checkHorizontals);
      const verticalWinner = hasWinner(checkVerticals);

      return horizontalWinner && verticalWinner ? true : false;
    };

    const hasWinner = checkerFn => {
      const hasAnyWinner = checkerFn().find(cell => cell.winner);

      if (hasAnyWinner) {
        setWinner(hasAnyWinner.rowSymbol);
        Alert.alert(`${hasAnyWinner.rowSymbol} Wins!`);
        return true;
      }
      return false;
    };

    if (!gameLoop()) {
      checkDraw();
    }
  };

  return (
    <AppContainer colorScheme={colorScheme}>
      <StatusBar barStyle="light-content" />
      <Header>
        <MainText colorScheme={colorScheme}>Tik Tak Toe</MainText>
        {winner.length > 0 && (
          <>
            <PlayerInfoText>
              {winner === 'Draw' ? winner : `Winner: ${winner}`}
            </PlayerInfoText>
            <ResetGameButton onPress={() => resetGame()}>
              <ResetGameText>
                Reset
              </ResetGameText>
            </ResetGameButton>
          </>
        )}
      </Header>
      <Board>
        <CardContainer>
          <Card onPress={() => pressButton(0, 0)}>
            <CardText>{board[0][0]}</CardText>
          </Card>
          <Card onPress={() => pressButton(0, 1)}>
            <CardText>{board[0][1]}</CardText>
          </Card>
          <Card onPress={() => pressButton(0, 2)}>
            <CardText>{board[0][2]}</CardText>
          </Card>
        </CardContainer>
        <CardContainer>
          <Card onPress={() => pressButton(1, 0)}>
            <CardText>{board[1][0]}</CardText>
          </Card>
          <Card onPress={() => pressButton(1, 1)}>
            <CardText>{board[1][1]}</CardText>
          </Card>
          <Card onPress={() => pressButton(1, 2)}>
            <CardText>{board[1][2]}</CardText>
          </Card>
        </CardContainer>
        <CardContainer>
          <Card onPress={() => pressButton(2, 0)}>
            <CardText>{board[2][0]}</CardText>
          </Card>
          <Card onPress={() => pressButton(2, 1)}>
            <CardText>{board[2][1]}</CardText>
          </Card>
          <Card onPress={() => pressButton(2, 2)}>
            <CardText>{board[2][2]}</CardText>
          </Card>
        </CardContainer>
      </Board>
    </AppContainer>
  );
};

export default App;
