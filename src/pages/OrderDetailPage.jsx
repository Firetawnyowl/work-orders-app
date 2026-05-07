import { useParams, useNavigate } from 'react-router-dom';
import { Card, Title, Text, Group, Stack, Button, LoadingOverlay, Grid } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Select, Textarea } from '@mantine/core';
import { useOrder, useUpdateOrder } from '../hooks/useOrders';
import { orderEditSchema } from '../schemas/validation';
import { useEffect } from 'react';

const statusOptions = [
  { value: 'new', label: 'Новый' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'done', label: 'Выполнен' },
  { value: 'cancelled', label: 'Отменен' }
];

const priorityOptions = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' }
];

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading } = useOrder(id);
  const { mutate: updateOrder, isPending } = useUpdateOrder();

  const form = useForm({
    initialValues: {
      status: 'new',
      priority: 'medium',
      deadline: '',
      comment: ''
    },
    validate: zodResolver(orderEditSchema)
  });

  useEffect(() => {
    if (order) {
      form.setValues({
        status: order.status,
        priority: order.priority,
        deadline: order.deadline?.split('T')[0] || '',
        comment: order.comment || ''
      });
    }
  }, [order]);

  const handleSubmit = (values) => {
    updateOrder({ id, data: values });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  if (!order) {
    return (
      <Card withBorder p="xl" ta="center">
        <Title order={3}>Заказ не найден</Title>
        <Button mt="md" onClick={() => navigate('/orders')}>Вернуться к списку</Button>
      </Card>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={isPending} />
      
      <Group justify="space-between" mb="md">
        <Title order={2}>Заказ {order.id}</Title>
        <Button variant="subtle" onClick={() => navigate('/orders')}>← Назад к списку</Button>
      </Group>

      <Grid>
        <Grid.Col span={6}>
          <Card withBorder radius="md" p="lg">
            <Title order={3} mb="md">Информация о заказе</Title>
            <Stack gap="sm">
              <Group>
                <Text fw={500} w={120}>Клиент:</Text>
                <Text>{order.client}</Text>
              </Group>
              <Group>
                <Text fw={500} w={120}>Тип работ:</Text>
                <Text>{order.workType}</Text>
              </Group>
              <Group>
                <Text fw={500} w={120}>Ответственный:</Text>
                <Text>{order.assignee}</Text>
              </Group>
              <Group>
                <Text fw={500} w={120}>Дедлайн:</Text>
                <Text>{formatDate(order.deadline)}</Text>
              </Group>
              <Group>
                <Text fw={500} w={120}>Создан:</Text>
                <Text>{formatDate(order.createdAt)}</Text>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card withBorder radius="md" p="lg">
            <Title order={3} mb="md">Редактирование заказа</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
                <Select
                  label="Статус"
                  data={statusOptions}
                  {...form.getInputProps('status')}
                />
                <Select
                  label="Приоритет"
                  data={priorityOptions}
                  {...form.getInputProps('priority')}
                />
                <Textarea
                  label="Комментарий"
                  placeholder="Введите комментарий..."
                  minRows={3}
                  {...form.getInputProps('comment')}
                />
                <Button type="submit" loading={isPending} fullWidth mt="md">
                  Сохранить изменения
                </Button>
              </Stack>
            </form>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}