import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';
import { ReactComponent as SalviaIcon } from './images/salvia.svg';

export default function Keys(props: SvgIconProps) {
  return <SvgIcon component={SalviaIcon} viewBox="0 0 150 58" {...props} />;
}
