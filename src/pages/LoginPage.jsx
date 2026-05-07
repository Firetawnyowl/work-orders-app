import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, TextInput, Button, Title, Stack, Container, PasswordInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { loginSchema } from '../schemas/validation';
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: zodResolver(loginSchema)
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const success = login(values.email, values.password);
    if (success) {
      notifications.show({
        title: 'Успешный вход',
        message: 'Добро пожаловать в систему!',
        color: 'green'
      });
      navigate('/orders');
    } else {
      notifications.show({
        title: 'Ошибка',
        message: 'Неверные учетные данные',
        color: 'red'
      });
    }
    setLoading(false);
  };

  return (
    <Container size={420} my={40}>
      <Card withBorder shadow="md" p={30} radius="md">
        <Title order={2} ta="center" mb="lg">
          Вход в систему
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="user@example.com"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Пароль"
              placeholder="Введите пароль"
              {...form.getInputProps('password')}
            />
            <Button type="submit" loading={loading} fullWidth mt="md">
              Войти
            </Button>
          </Stack>
        </form>
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'gray' }}>
          Любой email и пароль подходят (демо-режим)
        </div>
      </Card>
    </Container>
  );
}