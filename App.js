import React from 'react';
import styled from 'styled-components/native';

import {Header} from './src/pages/parts/Header/Header';
import {Board} from './src/pages/parts/Board/Board';
import {Card} from './src/pages/parts/Card/Card';
import {CardContainer} from './src/pages/CardContainer/CardContainer';
import {CardText} from './src/pages/parts/CardText/CardText';

import {useColorScheme, StatusBar, Alert, Text, StyleSheet} from 'react-native';

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

const TurnText = styled.Text`
  font-size: 32px;
  text-align: center;
  padding: 20px;
  font-weight: bold;
  background-color: #666666;
  color: #fff;
  margin-bottom: 20px;
`;

const ResetGameButton = styled.TouchableOpacity`
  background-color: crimson;
  padding: 20px 60px;
  margin-top: 20px;
  border-radius: 5px;
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
  const [winner, setWinner] = React.useState('');
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const [board, setBoard] = React.useState(new Array(9).fill(''));
  const [isFirstPlayer, setIsFirstPlayer] = React.useState(
    Math.random() > 0.5 ? true : false,
  );
  const colorScheme = useColorScheme();

  const resetGame = () => {
    setWinner('');
    const newBoard = new Array(9).fill('');
    setBoard(newBoard);
  };

  React.useEffect(() => {
    const checkWinner = () => {
      for (let rowCombination of winningCombinations) {
        let [cell1, cell2, cell3] = rowCombination;
        if (
          board[cell1] &&
          board[cell1] === board[cell2] &&
          board[cell1] === board[cell3]
        ) {
          setWinner(board[cell1]);
        }
      }
    };

    checkWinner();

    const checkDraw = () => {
      return !board.includes('');
    };
    if (checkDraw()) {
      setWinner('Draw');
      Alert.alert("It's a Draw!");
    }
  }, [board, winningCombinations]);

  const pressButton = idx => {
    if (winner) {
      Alert.alert('Game Over!');
      return false;
    }

    let playerSymbol = isFirstPlayer ? 'X' : 'O';
    if (board[idx].length > 0) {
      Alert.alert('Already choosed!');
      return false;
    }
    setBoard(oldBoard =>
      oldBoard.map((cell, cellIdx) => {
        if (idx === cellIdx) {
          cell = playerSymbol;
        }
        return cell;
      }),
    );

    setIsFirstPlayer(!isFirstPlayer);
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
      <Board showsVerticalScrollIndicator={false}>
        {winner.length === 0 && <TurnText>{ isFirstPlayer ? 'X': 'O' } {'Turn'} </TurnText>}
        <CardContainer>
          <Card onPress={() => pressButton(0)}>
            <CardText>{board[0]}</CardText>
          </Card>
          <Card onPress={() => pressButton(1)}>
            <CardText>{board[1]}</CardText>
          </Card>
          <Card onPress={() => pressButton(2)}>
            <CardText>{board[2]}</CardText>
          </Card>
        </CardContainer>
        <CardContainer>
          <Card onPress={() => pressButton(3)}>
            <CardText>{board[3]}</CardText>
          </Card>
          <Card onPress={() => pressButton(4)}>
            <CardText>{board[4]}</CardText>
          </Card>
          <Card onPress={() => pressButton(5)}>
            <CardText>{board[5]}</CardText>
          </Card>
        </CardContainer>
        <CardContainer>
          <Card onPress={() => pressButton(6)}>
            <CardText>{board[6]}</CardText>
          </Card>
          <Card onPress={() => pressButton(7)}>
            <CardText>{board[7]}</CardText>
          </Card>
          <Card onPress={() => pressButton(8)}>
            <CardText>{board[8]}</CardText>
          </Card>
        </CardContainer>
      </Board>
    </AppContainer>
  );
};

export default App;
