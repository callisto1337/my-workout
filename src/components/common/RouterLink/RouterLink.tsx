import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface RouterLinkProps extends LinkProps {}

export function RouterLink(props: RouterLinkProps): JSX.Element {
  return <Link style={{ all: 'unset' }} {...props} />;
}
