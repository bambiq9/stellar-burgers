import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getOrders, selectIsLoading, selectOrders } from '../../services/user-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const orders: TOrder[] = useSelector(selectOrders);

  useEffect(() => {
    if (!orders.length && !isLoading) dispatch(getOrders());
  }, []);

  console.log(orders);

  return <ProfileOrdersUI orders={orders} />;
};
