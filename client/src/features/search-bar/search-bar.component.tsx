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
    <div className='flex lg:flex-row md:flex-col sm:flex-col xsm:flex-col items-center w-full lg:justify-start md:justify-center sm:justify-center xsm:justify-center flex-wrap'>
      <div className='flex flex-row flex-wrap lg:justify-start md:justify-center sm:justify-center xsm:justify-center'>
        <TagPicker
          data={testData}
          className='min-w-searchInput mr-4 my-2 max-w-tagPicker rs-theme-dark'
          menuClassName='rs-theme-dark'
          placeholder='Tags...'
          searchable
          preventOverflow
          renderMenuItem={label => (
            <span className='font-normal text-base'>{label}</span>
          )}
        />

        <TagPicker
          data={testData}
          className='min-w-searchInput mr-4 my-2 max-w-tagPicker rs-theme-dark'
          menuClassName='rs-theme-dark'
          placeholder='Types...'
          searchable
          renderMenuItem={label => (
            <span className='font-normal text-base'>{label}</span>
          )}
        />

        <TagPicker
          data={testData}
          className='min-w-searchInput mr-4 my-2 max-w-tagPicker rs-theme-dark'
          menuClassName='rs-theme-dark'
          placeholder='Languages...'
          searchable
          renderMenuItem={label => (
            <span className='font-normal text-base'>{label}</span>
          )}
        />
      </div>

      {isAdvancedOpenned && (
        <div className='flex w-full mt-4 justify-start items-center'>
          <Input placeholder='Title name...' className='!w-64 mr-4 my-2' />

          <TagPicker
            data={testData}
            className='min-w-searchInput mr-4 my-2 max-w-tagPicker rs-theme-dark'
            menuClassName='rs-theme-dark'
            placeholder='Series...'
            searchable
            renderMenuItem={label => (
              <span className='font-normal text-base'>{label}</span>
            )}
          />

          <TagPicker
            data={testData}
            className='min-w-searchInput mr-4 my-2 max-w-tagPicker rs-theme-dark'
            menuClassName='rs-theme-dark'
            placeholder='Authors...'
            searchable
            renderMenuItem={label => (
              <span className='font-normal text-base'>{label}</span>
            )}
          />

          <TagPicker
            data={testData}
            className='min-w-searchInput mr-4 my-2 max-w-tagPicker rs-theme-dark'
            menuClassName='rs-theme-dark'
            placeholder='Groups...'
            searchable
            renderMenuItem={label => (
              <span className='font-normal text-base'>{label}</span>
            )}
          />
        </div>
      )}

      <div className='flex flex-row items-center lg:justify-end md:justify-center sm:justify-center xsm:justify-center w-full cursor-pointer mt-4'>
        <span className='text-xs mr-4 underline'>Advanced Search</span>

        <Arrow
          className={`${isAdvancedOpenned ? '-rotate-90' : 'rotate-90'}`}
          fill='white'
          width='12px'
          height='12px'
        />
      </div>
    </div>
  </div>
);
