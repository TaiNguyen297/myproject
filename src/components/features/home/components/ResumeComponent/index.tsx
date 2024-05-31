import { Container, Box, Stack, Typography } from "@mui/material";
import ktcbBackground from "../../../../../../public/background-dep-4k.jpg";
import LoadingButton from "@mui/lab/LoadingButton";
import data from '../../../../../utils/data/json/resume.json';
import { useRouter } from 'next/router';

type ResumeProps = {
  missionCartData: {
    title: string;
    imageUrl: string;
    description: string;
  }[];
};


export const ResumeComponent: React.FC<ResumeProps> = ({
}) => {
  const router = useRouter();
  return (
    <Container
    sx={{
      maxWidth: "1900px !important",
      paddingTop: 8,
      paddingBottom: 10,
      marginBottom: 5,
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${ktcbBackground.src})`,
      backgroundSize: "100% 100%;",
      backgroundPosition: "center",
    }}
    >
      <Stack alignItems="center">
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              md: "3rem",
            },

            color: "white",
          }}
        >
          ABOUT ME
        </Typography>

        <Stack direction="row" justifyContent="space-between" spacing={10}>
          <Box flexBasis="30%" p={2}>
            <img src={data.personal.imgSrc} alt="Profile" style={{ width: '350px', height: '350px', borderRadius: '50%', border: '2px solid white' }} />
          </Box>

          <Box flexBasis="40%" p={2}  display="flex" flexWrap="wrap">
            {data.experience.slice(0, 5).map((job: { title: string; company: string; startDate: string; endDate: string; }, index: number) => {
              const startDate = new Date(job.startDate);
              let endDate = new Date(); // Default to current date

              if (job.endDate !== 'Present') {
                endDate = new Date(job.endDate);
              }

              const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
              const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
              const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30));

              const yearString = diffYears > 1 ? `${diffYears} years` : diffYears === 1 ? `${diffYears} year` : '';
              const monthString = diffMonths > 1 ? `${diffMonths} months` : diffMonths === 1 ? `${diffMonths} month` : '';

              const duration = [yearString, monthString].filter(Boolean).join(', ');

              return (
                <Box key={index} flexBasis="50%" style={{ margin: '10px 0', padding: '10px' }}>
                  <Typography variant="h6" style={{ fontWeight: 'bold',color: 'white' }}>{job.title}</Typography>
                  <Typography style={{ fontStyle: 'italic', color: 'white' }}>{job.company}</Typography>
                  <Typography style={{ fontStyle: 'italic',color: 'white' }}>{job.startDate} - {job.endDate} ({duration})</Typography>
                </Box>
              );
            })}
          </Box>

          <Box flexBasis="30%" p={2}>
            {data.education.map((education: { degree: string; field: string; school: string; duration: string; }, index: number) => (
              <Box key={index} style={{ margin: '10px 0', padding: '10px' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold',color: 'white' }}>{education.degree}</Typography>
                <Typography style={{ fontStyle: 'italic',color: 'white' }}>{education.field}</Typography>
                <Typography style={{ fontStyle: 'italic',color: 'white' }}>{education.school}</Typography>
                <Typography style={{ fontStyle: 'italic',color: 'white' }}>{education.duration}</Typography>
              </Box>
            ))}
          </Box>
        </Stack>

        <LoadingButton
          variant="outlined"
          onClick={() => router.push('/resume')}
          sx={{
            alignSelf: "center",
            width: "fit-content",
            color: "white",
            borderColor: "white",
            "&:hover": {
              borderColor: "red",
              color: "red",
              backgroundColor: "white",
            },
          }}
        >
          Load More
        </LoadingButton>
      </Stack>
    </Container>
  );
};
