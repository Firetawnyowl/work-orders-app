import { Card, Title, Switch, Group, Text, Stack, useMantineColorScheme } from '@mantine/core';
import { useThemeStore } from '../store/themeStore';
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function SettingsPage() {
  const { colorScheme, toggleColorScheme } = useThemeStore();
  const { setColorScheme } = useMantineColorScheme();

  const handleToggle = (checked) => {
    const newScheme = checked ? 'dark' : 'light';
    toggleColorScheme();
    setColorScheme(newScheme);
  };

  return (
    <Card withBorder radius="md" p="xl">
      <Title order={2} mb="lg">Настройки интерфейса</Title>
      <Stack gap="md">
        <Card withBorder p="md" radius="md">
          <Group justify="space-between">
            <Group>
              {colorScheme === 'dark' ? <IconMoon size={24} /> : <IconSun size={24} />}
              <div>
                {colorScheme === 'dark' ? <Text fw={500}>Тёмная тема</Text> : <Text fw={500}>Светлая тема</Text> }
                {
                  colorScheme === 'dark' ? 
                  <Text size="sm" c="dimmed">Включить светлый режим интерфейса</Text> : 
                  <Text size="sm" c="dimmed">Включить тёмный режим интерфейса</Text> 
                }
              </div>
            </Group>
            <Switch
              checked={colorScheme === 'dark'}
              onChange={(e) => handleToggle(e.currentTarget.checked)}
              size="lg"
              onLabel="🌙"
              offLabel="☀️"
            />
          </Group>
        </Card>
        <Text size="sm" c="dimmed" ta="center" mt="xl">
          Настройки темы автоматически сохраняются в localStorage
        </Text>
      </Stack>
    </Card>
  );
}