import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { selectConstructorIngredients } from '../../services/constructor-slice';
import { selectIsAuthenticated } from '../../services/user-slice';
import { useNavigate } from 'react-router-dom';
import {
  clearOrder,
  placeOrder,
  selectIsLoading,
  selectOrder
} from '../../services/order-slice';
import { clearConstructor } from '../../services/constructor-slice';

export const BurgerConstructor: FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const constructorItems = useSelector(selectConstructorIngredients);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderRequest = useSelector(selectIsLoading);
  const orderModalData = useSelector(selectOrder);

  useEffect(() => {
    if (orderModalData) dispatch(clearConstructor());
  }, [orderModalData]);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredients = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    const buns = Array(2).fill(constructorItems.bun._id);

    dispatch(placeOrder([...ingredients, ...buns]));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

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
