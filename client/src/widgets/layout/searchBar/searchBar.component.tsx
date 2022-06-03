import { TagPicker } from 'rsuite';
import { Input } from 'rsuite';
import { Arrow } from '@shared/ui/atoms/icons/arrow';

const testData = [
  { label: 'test', value: 1 },
  { label: 'test', value: 2 },
  { label: 'test', value: 3 },
  { label: 'test', value: 4 },
  { label: 'test', value: 5 },
  { label: 'test', value: 6 },
  { label: 'test', value: 7 },
  { label: 'test', value: 8 },
  { label: 'test', value: 9 },
  { label: 'test', value: 10 },
  { label: 'test', value: 11 },
  { label: 'test', value: 12 }
];

const isAdvancedOpenned = false;

export const SearchBar = (): JSX.Element => (
  <div className='flex flex-col items-center w-full py-4 flex-wrap px-8'>
    <div className='flex flex-row items-center w-full justify-start flex-wrap'>
      <Input placeholder='Title name...' className='!w-64 mr-2' />

      <TagPicker
        data={testData}
        className='min-w-searchInput mr-2 max-w-tagPicker'
        placeholder='Tags...'
        searchable
        preventOverflow
        renderMenuItem={label => (
          <span className='font-normal text-base'>{label}</span>
        )}
      />

      <TagPicker
        data={testData}
        className='min-w-searchInput mr-2 max-w-tagPicker'
        placeholder='Types...'
        searchable
        renderMenuItem={label => (
          <span className='font-normal text-base'>{label}</span>
        )}
      />

      <TagPicker
        data={testData}
        className='min-w-searchInput mr-2 max-w-tagPicker'
        placeholder='Languages...'
        searchable
        renderMenuItem={label => (
          <span className='font-normal text-base'>{label}</span>
        )}
      />

      <div className='flex flex-row items-center cursor-pointer mt-4'>
        <span className='text-xs mr-2 underline'>Advanced Search</span>

        <Arrow className='rotate-90' fill='white' width='12px' height='12px' />
      </div>
    </div>

    {isAdvancedOpenned && (
      <div className='flex w-full mt-4 justify-start items-center'>
        <TagPicker
          data={testData}
          className='min-w-searchInput mr-2 max-w-tagPicker'
          placeholder='Series...'
          searchable
          renderMenuItem={label => (
            <span className='font-normal text-base'>{label}</span>
          )}
        />

        <TagPicker
          data={testData}
          className='min-w-searchInput mr-2 max-w-tagPicker'
          placeholder='Authors...'
          searchable
          renderMenuItem={label => (
            <span className='font-normal text-base'>{label}</span>
          )}
        />

        <TagPicker
          data={testData}
          className='min-w-searchInput mr-2 max-w-tagPicker'
          placeholder='Groups...'
          searchable
          renderMenuItem={label => (
            <span className='font-normal text-base'>{label}</span>
          )}
        />
      </div>
    )}
  </div>
);
