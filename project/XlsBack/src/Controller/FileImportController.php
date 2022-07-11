<?php

namespace App\Controller;

use DateTime;
use App\Entity\MusicGroup;
use App\Repository\CityRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\MusicTrendRepository;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class FileImportController extends AbstractController
{
    #[Route('/api/file-import', name: 'app_file_import')]
    public function index(
        Request $request,
        EntityManagerInterface $entityManager,
        MusicTrendRepository $musicTrendRepository,
        CityRepository $cityRepository
    ): Response {

        if ($request->files->get('file')->getMimeType() !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            return $this->json([
                'error' => 'Invalid file type'
            ], 400);
        }

        $reader = new Xlsx();
        $spreadsheet = $reader->load($request->files->get('file'));
        $sheetData = $spreadsheet->getActiveSheet()->toArray();
        unset($sheetData[0]);

        foreach ($sheetData as $row) {
            $musicGroup = new MusicGroup();
            $musicGroup->setName($row[0]);
            $musicGroup->setCity($cityRepository->findOneBy(["name" => $row[2]]));
            $musicGroup->setStartDate(new DateTime($row[3]));
            $musicGroup->setSeparationDate(new DateTime($row[4]));
            $musicGroup->setFounder($row[5]);
            $musicGroup->setMembers($row[6]);
            $musicGroup->setMusicTrend($musicTrendRepository->findOneBy(["name" => $row[7]]));
            $musicGroup->setPresentation($row[8]);
            $entityManager->persist($musicGroup);
        }
        $entityManager->flush();


        return $this->json([
            'message' => 'Imported successfully!'
        ],201);
    }
}
