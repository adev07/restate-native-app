import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { settings } from '@/constants/data'
import { useGlobalContext } from '@/lib/global-provider'
import { logout } from '@/lib/appwrite'

interface SettingsItmeProps {
    icon: ImageSourcePropType,
    title: string,
    onPress?: () => void,
    textStyle?: string,
    showArrow?: boolean
}

const SettingItems = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsItmeProps) => (
    <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
        <View className='flex flex-row items-center gap-3'>
            <Image className='size-6' source={icon} />
            <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
        </View>
        {showArrow && <Image source={icons.rightArrow} className='size-5' />}
    </TouchableOpacity>
)




const Profile = () => {

    const { user, refetch, loading } = useGlobalContext()

    if (loading) {
        return (
            <SafeAreaView className='bg-white h-full flex justify-center items-center'>
                <ActivityIndicator className='text-primary-300' size='large' />
            </SafeAreaView>
        )
    }



    const handleLogout = async () => {
        try {
            const result = await logout();
            if (result) {
                Alert.alert('Success', 'Logout Successfully');
                refetch();
            } else {
                Alert.alert('Error', 'Failed to logout');
            }
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred');
            console.error(error);
        }
    };

    return (
        <SafeAreaView className='h-full bg-white'>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName='pb-32 px-7'
            >
                <View className='flex flex-row items-center justify-between mt-5'>
                    <Text className='text-xl font-rubik-bold'>Profile</Text>
                    <Image source={icons.bell} className='size-5 mt-3' />
                </View>

                <View className='flex-row justify-center mt-5'>
                    <View className='flex flex-col items-center relative mt-5'>
                        <Image source={{ uri: user?.avatar }} className='size-44 relative rounded-full' />
                        <TouchableOpacity className='absolute bottom-11 right-2'>
                            <Image source={icons.edit} className='size-9' />
                        </TouchableOpacity>
                        <View className='flex flex-col items-center mt-3'>
                            <Text className='text-lg font-rubik-bold'>{user?.name}</Text>
                        </View>
                    </View>
                </View>
                <View className='flex flex-col mt-10'>
                    <SettingItems icon={icons.calendar} title='My Bookings' />
                    <SettingItems icon={icons.wallet} title='Payments' />
                </View>

                <View className='flex flex-col border-t mt-5 pt-5 border-primary-200'>
                    {settings.slice(2).map((item, index) => (
                        <SettingItems key={index} {...item} />
                    ))}
                </View>
                <View className='flex flex-col border-t mt-5 pt-5 border-primary-200'>
                    <SettingItems icon={icons.logout} title='Logout' onPress={handleLogout} textStyle='text-red-600' showArrow={false} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile  