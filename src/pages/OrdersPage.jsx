import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TextInput, Pagination, Paper, Title, Group, Badge, LoadingOverlay } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useOrders } from '../hooks/useOrders';
import '../styles/global.css';

const statusMap = {
  new: { label: 'Новый', color: 'blue' },
  in_progress: { label: 'В работе', color: 'yellow' },
  done: { label: 'Выполнен', color: 'green' },
  cancelled: { label: 'Отменен', color: 'red' }
};

const priorityMap = {
  low: { label: 'Низкий', color: 'green' },
  medium: { label: 'Средний', color: 'orange' },
  high: { label: 'Высокий', color: 'red' }
};

export default function OrdersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  
  const { data, isLoading } = useOrders({ search, page, limit: 5 });

  const orders = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('ru-RU');
  };

  return (
    <div style={{ position: 'relative', minHeight: 400 }}>
      <LoadingOverlay visible={isLoading} />
      <Paper shadow="sm" p="md" radius="md">
        <Group justify="space-between" mb="md" align="flex-end">
          <Title order={2}>Список заказов</Title>
          <TextInput
            placeholder="Поиск по номеру или клиенту"
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="search-input"
            style={{ width: 300 }}
          />
        </Group>

        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>№ заказа</Table.Th>
              <Table.Th>Клиент</Table.Th>
              <Table.Th>Тип работ</Table.Th>
              <Table.Th>Статус</Table.Th>
              <Table.Th>Приоритет</Table.Th>
              <Table.Th>Дедлайн</Table.Th>
              <Table.Th>Ответственный</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {orders.map((order) => (
              <Table.Tr 
                key={order.id} 
                onClick={() => navigate(`/orders/${order.id}`)}
                style={{ cursor: 'pointer' }}
                className="table-row-hover"
              >
                <Table.Td fw={500}>{order.id}</Table.Td>
                <Table.Td>{order.client}</Table.Td>
                <Table.Td>{order.workType}</Table.Td>
                <Table.Td>
                  <Badge color={statusMap[order.status]?.color}>
                    {statusMap[order.status]?.label}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <span className={`priority-${order.priority}`}>
                    {priorityMap[order.priority]?.label}
                  </span>
                </Table.Td>
                <Table.Td>{formatDate(order.deadline)}</Table.Td>
                <Table.Td>{order.assignee}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {orders.length === 0 && !isLoading && (
          <div style={{ textAlign: 'center', padding: 40 }}>Заказы не найдены</div>
        )}

        {orders.length > 0 && (
          <Group justify="center" mt="xl">
            <Pagination total={totalPages} value={page} onChange={setPage} />
          </Group>
        )}
      </Paper>
    </div>
  );
}