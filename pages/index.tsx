import {
  Anchor,
  AppShell,
  Button,
  Card,
  ChevronIcon,
  Drawer,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { NextPage } from "next";
import { useState } from "react";

interface ListItem {
  description: string;
}

interface AppOption {
  description: string;
}

const Home: NextPage = () => {
  const [list, setList] = useState<ListItem[]>([]);
  const [appOptions, setAppOptions] = useState<AppOption[]>([]);
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      description: "",
    },
  });

  function onFormSubmit({ description }: { description: string }) {
    list.push({ description });
    setList(list);
    form.reset();
  }

  const listItems = list.map((li) => (
    <Card withBorder py="xs">
      {li.description}
    </Card>
  ));

  const onDrawerClose = () => {
    setDrawerOpened(false);
  };

  const onCoreSupplyClick = () => {
    setAppOptions([
      { description: "Product candidates" },
      { description: "Quote request" },
    ]);
    setShowAppOptions(true);
  };

  const onCheckersClick = () => {
    setAppOptions([{ description: "Add to cart" }]);
    setShowAppOptions(true);
  };

  const onScoopClick = () => {
    setAppOptions([{ description: "Add to cart" }]);
    setShowAppOptions(true);
  };

  const appOptionsList = appOptions.map((ao) => (
    <Card py="xs" withBorder>
      <Text>{ao.description}</Text>
    </Card>
  ));

  return (
    <AppShell>
      <Stack align="stretch" justify="space-between" style={{ height: "100%" }}>
        <Stack>
          <Title color="blue">Listly</Title>
          <Text>Welecome to listly, create a list to get started</Text>
          <Stack spacing="xs">{listItems}</Stack>
          <form onSubmit={form.onSubmit(onFormSubmit)}>
            <TextInput
              {...form.getInputProps("description")}
              placeholder="Start typing..."
            ></TextInput>
            <Button type="submit" variant="default" fullWidth mt="xs">
              Add
            </Button>
          </form>
        </Stack>
        <Button onClick={() => setDrawerOpened(true)}>Convert to</Button>
      </Stack>
      <Drawer
        withCloseButton={false}
        opened={drawerOpened}
        onClose={onDrawerClose}
        padding="xl"
        size="xl"
        position="bottom"
      >
        <Stack
          align="stretch"
          justify="space-between"
          style={{ height: "100%" }}
        >
          {!showAppOptions && (
            <Stack spacing="xs">
              <Card py="xs" withBorder onClick={onCoreSupplyClick}>
                <Group position="apart">
                  <Group>
                    <Image
                      height="30px"
                      width="30px"
                      fit="contain"
                      src="https://assets.stickpng.com/images/58482d7fcef1014c0b5e4a5a.png"
                    ></Image>
                    <Text>Core Supply</Text>
                  </Group>
                  <ChevronIcon></ChevronIcon>
                </Group>
              </Card>
              <Card py="xs" withBorder onClick={onCheckersClick}>
                <Group position="apart">
                  <Group>
                    <Image
                      height="30px"
                      width="30px"
                      fit="contain"
                      src="https://www.sixty60.co.za/content/experience-fragments/checkersSixty60/site/header/master/_jcr_content/root/responsivegrid/navigation/navteaser.coreimg.70.300.png/1621407548723/sixty60-icon.png"
                    ></Image>
                    <Text>Checkers Sixty 60</Text>
                  </Group>
                  <ChevronIcon points="right"></ChevronIcon>
                </Group>
              </Card>
              <Card py="xs" withBorder onClick={onScoopClick}>
                <Group position="apart">
                  <Group>
                    <Image
                      height="30px"
                      width="30px"
                      fit="contain"
                      src="https://scoop.co.za/pub/media/favicon/websites/1/scoop_favicon.ico"
                    ></Image>
                    <Text>Scoop</Text>
                  </Group>
                  <ChevronIcon points="right"></ChevronIcon>
                </Group>
              </Card>
            </Stack>
          )}
          {showAppOptions && (
            <Stack>
              <Anchor onClick={() => setShowAppOptions(false)}>back</Anchor>
              {appOptionsList}
            </Stack>
          )}
          <Button variant="default">Add an app</Button>
        </Stack>
      </Drawer>
    </AppShell>
  );
};

export default Home;
