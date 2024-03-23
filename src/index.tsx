/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { FC, useState, ReactElement, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';

export interface StepperProps {
  active: number;
  content: ReactElement[];
  onNext: Function;
  onBack: Function;
  onFinish: Function;
  wrapperStyle?: ViewStyle;
  stepStyle?: ViewStyle;
  stepLine?: ViewStyle;
  stepTextStyle?: TextStyle;
  buttonNextStyle?: ViewStyle;
  buttonBackStyle?: ViewStyle;
  buttonFinishStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  showButton?: boolean;
  nextButtonLabel?: string;
  backButtonLabel?: string;
  finishButtonLabel?: string;
}

const Stepper: FC<StepperProps> = (props) => {
  const {
    active: activeStep,
    content,
    onBack,
    onNext,
    onFinish,
    wrapperStyle,
    stepLine,
    stepStyle,
    stepTextStyle,
    buttonNextStyle,
    buttonBackStyle,
    buttonFinishStyle,
    buttonTextStyle,
    showButton = true,
    nextButtonLabel,
    backButtonLabel,
    finishButtonLabel,
  } = props;
  const [steps, setSteps] = useState<number[]>([0]);
  const pushData = (val: number) => {
    setSteps((prev) => [...prev, val]);
  };

  const removeData = () => {
    setSteps((prev) => {
      prev.pop();
      return prev;
    });
  };

  useEffect(() => {
    if (steps[steps.length - 1] > activeStep) {
      removeData();
    } else {
      pushData(activeStep);
    }
  }, [activeStep, steps]);

  return (
    <View style={wrapperStyle}>
      <NumberLine {...{ content, stepLine, steps, stepStyle, stepTextStyle }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {content[activeStep]}
      </ScrollView>
      {showButton && (
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {activeStep !== 0 && (
            <Button
              style={[buttonBackStyle]}
              onPress={() => {
                onBack();
              }}
              buttonTextStyle={buttonTextStyle}
              label={backButtonLabel}
            />
          )}
          {content.length - 1 !== activeStep && (
            <Button
              style={buttonNextStyle}
              onClick={onNext}
              textStyle={buttonTextStyle}
              label={nextButtonLabel}
            />
          )}
          {content.length - 1 === activeStep && (
            <Button
              style={buttonFinishStyle}
              onPress={onFinish}
              textStyle={buttonTextStyle}
              label={finishButtonLabel}
            />
          )}
        </View>
      )}
    </View>
  );
};

type NumberLineProps = {
  content: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
  stepLine: ViewStyle | undefined;
  steps: number[];
  stepStyle: ViewStyle | undefined;
  stepTextStyle: TextStyle | undefined;
};
function NumberLine({
  content,
  stepLine,
  steps,
  stepStyle,
  stepTextStyle,
}: NumberLineProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {content.map((_, i) => {
        return (
          <React.Fragment key={i}>
            {i !== 0 && (
              <View
                style={[
                  {
                    flex: 1,
                    height: 1,
                    backgroundColor: 'grey',
                    opacity: 1,
                    marginHorizontal: 10,
                  },
                  stepLine,
                ]}
              />
            )}
            <View
              style={[
                {
                  backgroundColor: '#1976d2',
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: containsKey(i, steps) ? 1 : 0.3,
                },
                stepStyle,
              ]}
            >
              {containsKey(i, steps) ? (
                <Text
                  style={[
                    {
                      color: 'white',
                    },
                    stepTextStyle,
                  ]}
                >
                  &#10003;
                </Text>
              ) : (
                <Text
                  style={[
                    {
                      color: 'white',
                    },
                    stepTextStyle,
                  ]}
                >
                  {i + 1}
                </Text>
              )}
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
}

function Button({ style, onPress, textStyle, label }: any) {
  return (
    <TouchableOpacity
      style={[
        {
          padding: 10,
          borderRadius: 4,
          backgroundColor: '#1976d2',
          alignSelf: 'flex-start',
          marginRight: 10,
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[{ color: 'white' }, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

function containsKey(keyName: number, myArray: number[]): boolean {
  return myArray.includes(keyName);
}

export default Stepper;
