import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
  Spinner,
} from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { FiSend } from 'react-icons/fi'
import * as aiService from '@/services/ai'

type Message = {
  role: 'user' | 'assistant'
  text: string
}

export default function AIChatButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Привет! Я на базе CodeT5p и готов помочь с кодом и документацией.' },
  ])
  const [isSending, setIsSending] = useState(false)
  const toast = useToast()
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isOpen])

  const handleSend = async () => {
    const text = prompt.trim()
    if (!text || isSending) return

    setPrompt('')
    setMessages((prev) => [...prev, { role: 'user', text }])
    setIsSending(true)

    try {
      const reply = await aiService.sendMessage(text)
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }])
    } catch (err: any) {
      toast({
        title: 'Не удалось получить ответ',
        description: err?.message || 'Попробуйте еще раз',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    } finally {
      setIsSending(false)
    }
  }

  const handleClose = () => {
    setPrompt('')
    onClose()
  }

  return (
    <>
      <Button
        size="sm"
        leftIcon={<ChatIcon />}
        colorScheme="teal"
        variant="solid"
        onClick={onOpen}
      >
        AI помощник
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Диалог с AI</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={3}>
              <Box
                ref={scrollRef}
                maxH="50vh"
                overflowY="auto"
                p={2}
                borderWidth="1px"
                borderRadius="md"
                bg="gray.50"
              >
                <VStack align="stretch" spacing={3}>
                  {messages.map((msg, idx) => (
                    <Box
                      key={idx}
                      alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                      maxW="90%"
                      borderRadius="md"
                      bg={msg.role === 'user' ? 'blue.500' : 'white'}
                      color={msg.role === 'user' ? 'white' : 'gray.800'}
                      p={3}
                      boxShadow="sm"
                    >
                      <Text fontSize="xs" opacity={0.8} mb={1}>
                        {msg.role === 'user' ? 'Вы' : 'CodeT5p'}
                      </Text>
                      <Text whiteSpace="pre-wrap">{msg.text}</Text>
                    </Box>
                  ))}
                  {isSending && (
                    <HStack spacing={2}>
                      <Spinner size="sm" />
                      <Text fontSize="sm" color="gray.600">Модель генерирует ответ...</Text>
                    </HStack>
                  )}
                </VStack>
              </Box>

              <Box w="full">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Спросите про код, документацию или архитектуру..."
                  minH="90px"
                  resize="vertical"
                />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button variant="ghost" onClick={handleClose}>
                Закрыть
              </Button>
              <Button
                colorScheme="blue"
                rightIcon={<Icon as={FiSend} />}
                onClick={handleSend}
                isLoading={isSending}
                isDisabled={!prompt.trim() || isSending}
              >
                Отправить
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
