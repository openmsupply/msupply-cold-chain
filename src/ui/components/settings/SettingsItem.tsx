import React, { FC, ReactNode } from 'react';
import { NormalText, MediumText } from '../../presentation/typography';
import { MaybeTouchableContainer, SettingsRowLayout } from '../../layouts';
import { COLOUR } from '../../../common/constants';

interface SettingsItemProps {
  label: string;
  subtext?: string;
  LeftIcon?: ReactNode;
  RightComponent?: ReactNode;
  onPress?: () => void;
  isDisabled?: boolean;
}

export const SettingsItem: FC<SettingsItemProps> = ({
  label,
  subtext = '',
  LeftIcon = null,
  RightComponent = null,
  onPress = null,
  isDisabled = false,
}) => (
  <MaybeTouchableContainer isDisabled={isDisabled} onPress={onPress}>
    <SettingsRowLayout
      Text={<MediumText color={COLOUR.GREY_ONE}>{label}</MediumText>}
      Subtext={subtext ? <NormalText color={COLOUR.GREY_ONE}>{subtext}</NormalText> : null}
      LeftIcon={LeftIcon}
      RightComponent={RightComponent}
    />
  </MaybeTouchableContainer>
);
