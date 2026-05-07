import { AppShell, Burger, Group, Title, Button, Avatar, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { IconLogout, IconSettings, IconList } from '@tabler/icons-react';

export default function Layout({ children }) {
  const [opened, { toggle }] = useDisclosure();
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={3}>Управление заказами</Title>
          </Group>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="subtle" radius="xl">
                <Avatar size="sm" radius="xl" color="blue">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </Avatar>
                <span style={{ marginLeft: 8 }}>{user?.name || 'Пользователь'}</span>
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconList size={16} />} component={Link} to="/orders">
                Заказы
              </Menu.Item>
              <Menu.Item leftSection={<IconSettings size={16} />} component={Link} to="/settings">
                Настройки
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item leftSection={<IconLogout size={16} />} color="red" onClick={handleLogout}>
                Выйти
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Button component={Link} to="/orders" variant="subtle" fullWidth mb="sm" leftSection={<IconList size={16} />}>
          Заказы
        </Button>
        <Button component={Link} to="/settings" variant="subtle" fullWidth leftSection={<IconSettings size={16} />}>
          Настройки
        </Button>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}