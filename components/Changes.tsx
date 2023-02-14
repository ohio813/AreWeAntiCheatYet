import { Group, Table, Text } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { Change, Game } from '../src/types/games';
import AntiCheatBadge from './AntiCheatBadge';
import Notes from './Notes';
import Reference from './Reference';
import StatusBadge from './StatusBadge';
import Updates from './Updates';

interface ChangesProps {
  change: Change;
  withCaption?: boolean;
}

export default function ({ change, withCaption }: ChangesProps) {
  const { old, recent, changedProperties } = change;

  if (!old) {
    return (
      <Group noWrap spacing={5} align="center">
        <IconCirclePlus />
        <Text>Newly added!</Text>
      </Group>
    );
  }

  const head = (
    <tr>
      <th>Last State</th>
      <th>Recent Changes</th>
    </tr>
  );

  const body = changedProperties.map((property) => {
    const component = (game: Game) => {
      switch (property) {
        case 'anticheats':
          return game.anticheats.map((anticheat) => (
            <AntiCheatBadge key={property} anticheat={anticheat} height={32} />
          ));
        case 'notes':
          return <Notes size="sm" fz="xs" key={property} game={game} />;
        case 'status':
          return <StatusBadge sx={{ width: 'fit-content' }} h={25} game={game} />;
        case 'updates':
          return <Updates fz="xs" fzBody="xs" fzTitle="xs" game={game} />;
        case 'reference':
          return <Reference game={game} fz={'xs'} />;
        case 'native':
          return <Text fz="xs">{game[property] ? 'Native' : 'Not Native'}</Text>;
      }
    };

    return (
      <tr key={property}>
        <td>{component(old)}</td>
        <td>{component(recent)}</td>
      </tr>
    );
  });

  return (
    <Table striped withBorder withColumnBorders>
      {(withCaption ?? true) && <caption>Game Changes</caption>}
      <thead>{head}</thead>
      <tbody>{body}</tbody>
    </Table>
  );
}
