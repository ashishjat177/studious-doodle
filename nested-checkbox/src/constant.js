export const STATUS = {
    CHECKED: 'checked',
    UNCHECKED: 'unchecked',
    INDETERMINATE: 'indeterminate'
}

export const data = [
 {
    label: 'Work Projects',
    id: '1',
    status: STATUS.INDETERMINATE,
    children: [
        {
            label: 'Project X',
            id: '1.1',
            status: STATUS.INDETERMINATE,
            children: [
                {
                    label: 'UX design',
                    id: '1.1.1',
                    status: STATUS.CHECKED,
                    children: [
                        {
                            label: 'WireFrame.sketch',
                            id: '1.1.1.1',
                            status: STATUS.CHECKED,
                        },
                        {
                            label: 'Prototype.fig',
                            id: '1.1.1.2',
                            status: STATUS.CHECKED,
                        }
                    ]
                },
                {
                    label: 'Development',
                    id: '1.1.2',
                    status: STATUS.UNCHECKED,
                    children: [
                        {
                            label: 'Frontend',
                            id: '1.1.2.1',
                            status: STATUS.UNCHECKED,
                        },
                        {
                            label: 'Backend',
                            id: '1.1.2.2',
                            status: STATUS.UNCHECKED,
                        }
                    ]
                }
            ]
        },
        {
            label: 'Project Y',
            id: '1.2',
            status: STATUS.UNCHECKED,
            children: [
                {
                    label: 'Research',
                    id: '',
                    status: STATUS.UNCHECKED,
                }
            ]
        }
    ]
},
{
    label: 'Personal',
    id: '2',
    status: STATUS.UNCHECKED,
    children: [
        {
            label: 'Finance',
            id: '2.1',
            status: STATUS.UNCHECKED,
            children: [
                {
                    label: 'Tax 2023',
                    id: '2.1.1',
                    status: STATUS.UNCHECKED,
                },
                {
                    label: 'Investement',
                    id: '2.1.2',
                    status: STATUS.UNCHECKED,
                }
            ]
        },
        {
            label: 'Travel plans',
            id: '2.2',
            status: STATUS.UNCHECKED,
            children: [
                {
                    label: 'Europe trip',
                    id: '2.2.1',
                    status: STATUS.UNCHECKED,
                    children: [
                        {
                            label: 'Flight booking',
                            id: '2.2.1.1',
                            status: STATUS.UNCHECKED,
                        },
                        {
                            label: 'Hotel reservation',
                            id: '2.2.1.2',
                            status: STATUS.UNCHECKED,
                        }
                    ]
                }
            ]
        }
    ]
},
{
    label: 'Archieved',
    id: '3',
    status: STATUS.UNCHECKED,
}
]
