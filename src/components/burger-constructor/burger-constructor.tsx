import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  placeOrder,
  selectConstructorIngredients
} from '../../services/constructor-slice';
import { selectIsAuthenticated } from '../../services/user-slice';
import { Navigate, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const constructorItems = useSelector(selectConstructorIngredients);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;

    const data = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    dispatch(placeOrder(data));
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
