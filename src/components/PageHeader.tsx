
const PageHeader = ({ Title, subTitle }: { Title: string, subTitle?: String }) => {
    return (
        <div className='flex flex-col gap-2 my-5'>
            <p className='text-3xl'>{Title}</p>
            <p className='text-sm text-gray-400'>{subTitle}</p>
        </div>

    )
}

export default PageHeader