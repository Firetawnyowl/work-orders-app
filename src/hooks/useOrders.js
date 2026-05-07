import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchOrders, fetchOrderById, updateOrder } from '../api/orders';
import { notifications } from '@mantine/notifications';

export const useOrders = (params) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => fetchOrders(params),
    staleTime: 5000
  });
};

export const useOrder = (id) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id),
    enabled: !!id
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateOrder,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
      notifications.show({
        title: 'Успех',
        message: 'Заказ успешно обновлен',
        color: 'green'
      });
    },
    onError: (error) => {
      notifications.show({
        title: 'Ошибка',
        message: error.message || 'Не удалось обновить заказ',
        color: 'red'
      });
    }
  });
};