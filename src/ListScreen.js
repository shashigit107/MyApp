import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { memo } from 'react'
import moment from 'moment'
const { height, width } = Dimensions.get("screen")

function ListScreen({
    data = [],
    callBack = false,
    conatinerStyle = {}
}) {


    const deleteHandler = (item) => {
        const filterData = data.filter((ele) => ele.id !== item.id)
        callBack([...filterData])
    }

    const completedHandler = (item) => {
        const filterData = data.map((ele) => {
            if (ele.id === item.id) {
                return { ...ele, completed: true }
            } else {
                return ele
            }
        })
        callBack([...filterData])
    }

    const renderHandler = ({ item }) => {

        return (
            <View style={[styles.cardStyle]}>
                <Text>{item?.text}</Text>
                <TouchableOpacity onPress={() => deleteHandler(item)}>
                    <Text>delete Task</Text>
                </TouchableOpacity>
                <View style={styles.datestyle}>
                    <Text>Created Date</Text>
                    <Text>{moment(item?.cretedDate).format('LL')}</Text>
                </View>
                {!item?.completed ?
                    <TouchableOpacity onPress={() => completedHandler(item)}>
                        <Text>mark as completed</Text>
                    </TouchableOpacity> : <Text>Completed</Text>
                }

            </View>
        )
    }

    const renderItemSeperator = () => {
        return <View style={{ height: 20 }} />
    }

    const renderListEmptyComponent = () => {
        return (
            <View style={styles.emptyData}>
                <Text>Empty State</Text>
            </View>
        )
    }

    return (
        <View style={conatinerStyle}>
            <FlatList
                data={data}
                renderItem={renderHandler}
                keyExtractor={(_,index)=>index.toString()}
                ItemSeparatorComponent={renderItemSeperator}
                style={{ marginTop: "20" }}
                ListEmptyComponent={renderListEmptyComponent}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: "white",
        borderLeftWidth: 12,
        borderColor: "green",
        borderRadius: 12,
        padding: 10


    },
    emptyData: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: height / 3
    }
})

export default memo(ListScreen)

