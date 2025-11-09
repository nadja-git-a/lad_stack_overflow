import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { RootState } from '../../app/store';

export function RequireAuth() {
  const isAuth = useSelector((s: RootState) => s.auth.isAuth);
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

export function RequireRole(props: { allowed: Array<'admin' | 'user'> }) {
  const role = useSelector((s: RootState) => s.auth.role);
  if (!role || !props.allowed.includes(role)) {
    return <Navigate to="/403" replace />;
  }
  return <Outlet />;
}

export function isApiError(e: unknown): e is { status: number; data?: { message?: string } } {
  return typeof e === 'object' && e !== null && 'status' in e;
}

export function getErrorMessage(e: unknown): string {
  if (isApiError(e)) {
    return e.data?.message ?? 'Unknown error';
  }
  return 'Unknown error';
}
