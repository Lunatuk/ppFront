import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Code } from '@chakra-ui/react'

export default function DocViewer({
  readme,
  apiDocs,
  umlMermaid
}: { readme: string; apiDocs: string; umlMermaid: string }) {
  return (
    <Box>
      <Heading size="md" mb={4}>Документация</Heading>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>README</Tab>
          <Tab>API</Tab>
          <Tab>UML (Mermaid)</Tab>
        </TabList>
        <TabPanels>
          <TabPanel><Code p={3} whiteSpace="pre-wrap" w="full">{readme}</Code></TabPanel>
          <TabPanel><Code p={3} whiteSpace="pre-wrap" w="full">{apiDocs}</Code></TabPanel>
          <TabPanel><Code p={3} whiteSpace="pre-wrap" w="full">{umlMermaid}</Code></TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}